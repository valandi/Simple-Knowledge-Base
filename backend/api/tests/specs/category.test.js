const chai = require('chai');
const chaiHttp = require('chai-http');
const { base_url, getRandomString, generateTag, generateCategory, getBaseUrl } = require('../utils/test-utils');

chai.use(chaiHttp);

describe('Category API tests', () => {
    describe('save category tests', async() => {

        testCat= generateCategory();
        var testCatId = "";

        it('should create category and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveCategory')
                .send(testCat)
                .then((res) => {
                    testCatId = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testCat.name);
                });
        });

        it('should not create category with bad request and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveCategigory')
                .send({
                    "notakey": "notavalue"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test category', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteCategory/${testCatId}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });
    
    describe('get category tests', async() => {

        testCat2 = generateCategory();
        var testCatId2 = "";

        before('Create category to get', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveCategory')
                .send(testCat2)
                .then((res) => {
                    testCatId2 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testCat2.name);
                });
        });

        it('should get category and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .get(`/api/getCategory/${testCatId2}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.name).to.equal(testCat2.name);
                });
        });

        it('should not get nonexistent category and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .get('/api/getCategory/notACat')
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test category', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteCategory/${testCatId2}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('get categories tests', async() => {

        testCat3 = generateCategory();
        var testCatId3 = "";

        before('Create category to get', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveCategory')
                .send(testCat3)
                .then((res) => {
                    testCatId3 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testCat3.name);
                });
        });

        it('should get categories and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .get('/api/getCategories')
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.length).to.greaterThanOrEqual(1);
                });
        });

        after('delete test category', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testCatId3}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('edit category tests', async() => {

        testCat4 = generateCategory();
        var testCatId4 = "";
        var testCatName = getRandomString();

        before('Create category to get', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveCategory')
                .send(testCat4)
                .then((res) => {
                    testCatId4 = res.body.data._id;
                    testCatName = res.body.data.name;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testCat4.name);
                });
        });

        it('should edit category and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .put('/api/editCategory')
                .send({
                    _id: testCatId4,
                    name: testCatName,
                    color: "#aaaaaa"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
            
            await chai
                .request(getBaseUrl())
                .get(`/api/getCategory/${testCatId4}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.name).to.equal(testCatName);
                });
            
        });

        it('should not edit category that are nonexistent and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .put('/api/editTag')
                .send({
                    _id: "notanId",
                    name: testCatName,
                    color: "#aaaaaa"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test category', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testCatId4}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('delete category tests', async() => {

        testCat5 = generateTag();
        var testCatId5 = "";

        before('Create category to delete', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testCat5)
                .then((res) => {
                    testCatId5 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testCat5.name);
                });
        });

        it('should delete category and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteCategory/${testCatId5}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                })
            
            await chai
                .request(getBaseUrl())
                .get(`/api/getCategory/${testCatId5}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(Object.keys(res.body).length).to.equal(0);
                }); 
        });

        it('should not delete categories that are nonexistent and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .delete('/api/deleteCategory/notaCat')
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });
    });
});