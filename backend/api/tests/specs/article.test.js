const chai = require('chai');
const chaiHttp = require('chai-http');
const { base_url, getRandomString, generateTag, generateCategory, getBaseUrl } = require('../utils/test-utils');

chai.use(chaiHttp);

var tag1 = {};
var cat1 = {};
describe('Article API tests', () => {

    before('Create tag and category', async () => {
        const tag1_res = await chai
        .request(getBaseUrl())
        .post('/api/saveTag')
        .send(generateTag());
        tag1 = tag1_res.body.data;

        const cat1_res = await chai
        .request(getBaseUrl())
        .post('/api/saveCategory')
        .send(generateCategory());
        cat1 = cat1_res.body.data;
    });

    describe('save article tests', async() => {
        
        var testArticle = {};

        it('should create article and return 201', async() => {
            const articleTitle = "My Article";
            const markdown = "# Hello World\n## Section 1\n## Section 2";
            const article_res = await chai
                .request(getBaseUrl())
                .post('/api/saveArticle')
                .send({
                    markdown: markdown,
                    title: articleTitle,
                    tags: [{
                        "_id": tag1._id,
                        "name": tag1.name
                    }],
                    category: {
                        "_id": cat1._id,
                        "name": cat1.name
                    }
                })
                .then((res) => {
                    testArticle = res.body.data;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.title).to.equals(articleTitle);
                    chai.expect(res.body.data.markdown).to.equals(markdown);
                });

        });

        it('should not create article with bad request and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveArticle')
                .send({
                    title: "title",
                    category: 4
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test article', async () => {
            await chai
            .request(getBaseUrl())
            .delete(`/api/deleteArticle/${testArticle._id}`)
            .send()
        });
    });
    
    describe('edit article tests', async() => {
        var testArticle = {};

        
        before('Create article to edit', async () => {
            
            const articleTitle = "My Article";
            const markdown = "# Hello World\n## Section 1\n## Section 2";

            const article_res = await chai
            .request(getBaseUrl())
            .post('/api/saveArticle')
            .send({
                markdown: markdown,
                title: articleTitle,
                tags: [{
                    "_id": tag1._id,
                    "name": tag1.name
                }],
                category: {
                    "_id": cat1._id,
                    "name": cat1.name
                }
            })
            .then((res) => {
                testArticle = res.body.data;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body.data.title).to.equals(articleTitle);
                chai.expect(res.body.data.markdown).to.equals(markdown);
            });
        });

        it('should successfully edit article and return 200', async () => {
            const edit_article_res = await chai
                .request(getBaseUrl())
                .put('/api/editArticle')
                .send({
                    "_id": testArticle._id,
                    "markdown": "new markdown"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });

        it('should not edit article with bad request and return 400', async () => {
            const edit_article_res = await chai
            .request(getBaseUrl())
            .put('/api/editArticle')
            .send({
                "_id": "not_a_valid_id",
                "markdown": "new markdown"
            })
            .then((res) => {
                chai.expect(res).to.have.status(400);
            });
        });
        
        after('delete test article', async () => {
            await chai
            .request(getBaseUrl())
            .delete(`/api/deleteArticle/${testArticle._id}`)
            .send()
        });
    });

    describe('get articles tests', async() => {
        it('should successfully get articles and return 200', async () => {
            await chai
                .request(getBaseUrl())
                .get('/api/getArticles')
                .query()
                .then((res) => {
                    chai.expect(res.body.data);
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('get article tests', async() => {

        const articleTitle = "test article title";
        const markdown = "# Hello World\n## Section 1\n## Section 2";
        var testArticle = {};

        before('Create article to get', async () => {
            
            await chai
                .request(getBaseUrl())
                .post('/api/saveArticle')
                .send({
                    markdown: markdown,
                    title: articleTitle,
                    tags: [{
                        "_id": tag1._id,
                        "name": tag1.name
                    }],
                    category: {
                        "_id": cat1._id,
                        "name": cat1.name
                    }
                })
                .then((res) => {
                    testArticle = res.body.data;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.title).to.equals(articleTitle);
                    chai.expect(res.body.data.markdown).to.equals(markdown);
                });
        });

        it('should successfully get article and return 200', async () => {
            await chai
                .request(getBaseUrl())
                .get(`/api/getArticle/${testArticle._id}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.title).to.equals(articleTitle);
                    chai.expect(res.body.data.markdown).to.equals(markdown);
                });
        });

        it('should return 400 when id is invalid', async () => {
            await chai
                .request(getBaseUrl())
                .get("/api/getArticle/notarealid")
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('Delete article', async () => {
            
            await chai
                .request(getBaseUrl())
                .post('/api/saveArticle')
                .send({
                    markdown: markdown,
                    title: articleTitle,
                    tags: [{
                        "_id": tag1._id,
                        "name": tag1.name
                    }],
                    category: {
                        "_id": cat1._id,
                        "name": cat1.name
                    }
                })
                .then((res) => {
                    testArticle = res.body.data;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.title).to.equals(articleTitle);
                    chai.expect(res.body.data.markdown).to.equals(markdown);
                });
        });
    });

    describe('delete article tests', async() => {
        var testArticle = {};

        
        before('Create article to edit', async () => {
            
            const articleTitle = "My Article";
            const markdown = "# Hello World\n## Section 1\n## Section 2";

            const article_res = await chai
            .request(getBaseUrl())
            .post('/api/saveArticle')
            .send({
                markdown: markdown,
                title: articleTitle,
                tags: [{
                    "_id": tag1._id,
                    "name": tag1.name
                }],
                category: {
                    "_id": cat1._id,
                    "name": cat1.name
                }
            })
            .then((res) => {
                testArticle = res.body.data;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body.data.title).to.equals(articleTitle);
                chai.expect(res.body.data.markdown).to.equals(markdown);
            });
        });

        it('should successfully delete valid article and return 200', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteArticle/${testArticle._id}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });

        it('should not delete article that does not exist and return 400', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteArticle/notRealId`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });
    });

    describe('search articles tests', async() => {

        var testArticle = {};

        before('Create article to edit', async () => {
            
            const articleTitle = "My Article";
            const markdown = "# Hello World\n## Section 1\n## Section 2";

            await chai
            .request(getBaseUrl())
            .post('/api/saveArticle')
            .send({
                markdown: markdown,
                title: articleTitle,
                tags: [{
                    "_id": tag1._id,
                    "name": tag1.name
                }],
                category: {
                    "_id": cat1._id,
                    "name": cat1.name
                }
            })
            .then((res) => {
                testArticle = res.body.data;
                chai.expect(res).to.have.status(201);
            });
        });

        it('should successfully search articles and return 200', async () => {
            await chai
            .request(getBaseUrl())
            .post('/api/searchArticles')
            .send({
                text: "Section",
                tags: [{
                    "_id": tag1._id,
                    "name": tag1.name
                }],
                category: {
                    "_id": cat1._id,
                    "name": cat1.name
                }
            })
            .then((res) => {
                expectedArticle = res.body.data.filter((article) => article._id === testArticle._id);
                chai.expect(expectedArticle.length).to.equal(1);
                chai.expect(expectedArticle[0].category._id).to.equal(cat1._id);
                chai.expect(res).to.have.status(200);

            });
        });

        it('should not successfully search articles with non-existent tag and return 400', async () => {
            await chai
            .request(getBaseUrl())
            .post('/api/searchArticles')
            .send({
                text: "",
                tags: [{
                    "_id": "notRealId",
                    "name": tag1.name
                }],
                category: {
                    "_id": "notRealCategory",
                    "name": cat1.name
                }
            })
            .then((res) => {
                chai.expect(res).to.have.status(400);

            });
        });

        after('delete test article', async () => {
            await chai
            .request(getBaseUrl())
            .delete(`/api/deleteArticle/${testArticle._id}`)
            .send()
        });
    });

    after('delete test tag and test category', async () => {
        await chai
            .request(getBaseUrl())
            .delete(`/api/deleteTag/${tag1._id}`)
            .send()
            .then((res) => {
                chai.expect(res).to.have.status(200);
            });

        await chai
            .request(getBaseUrl())
            .delete(`/api/deleteCategory/${cat1._id}`)
            .send()
            .then((res) => {
                chai.expect(res).to.have.status(200);
            });
    });
});