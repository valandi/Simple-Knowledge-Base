const chai = require('chai');
const chaiHttp = require('chai-http');
const { base_url, getRandomString, generateTag, generateCategory, getBaseUrl } = require('../utils/test-utils');

chai.use(chaiHttp);

describe('Tag API tests', () => {
    describe('save tag tests', async() => {

        testTag = generateTag();
        var testTagId = "";

        it('should create tag and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testTag)
                .then((res) => {
                    testTagId = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testTag.name);
                });
                
        });

        it('should not create tag with bad request and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send({
                    "notakey": "notavalue"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test tag', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testTagId}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });
    
    describe('get tag tests', async() => {

        testTag2 = generateTag();
        var testTagId2 = "";

        before('Create tag to get', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testTag2)
                .then((res) => {
                    testTagId2 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testTag2.name);
                });
        });

        it('should get tag and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .get(`/api/getTag/${testTagId2}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.name).to.equal(testTag2.name);
                });
        });

        it('should tag that does not exist and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .get('/api/getTag/notATag')
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test tag', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testTagId2}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('get tags tests', async() => {

        testTag3 = generateTag();
        var testTagId3 = "";

        before('Create tag to get', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testTag3)
                .then((res) => {
                    testTagId3 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testTag3.name);
                });
        });

        it('should get tags and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .get('/api/getTags')
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.length).to.greaterThanOrEqual(1);
                });
        });

        after('delete test tag', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testTagId3}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('edit tag tests', async() => {

        testTag4 = generateTag();
        var testTagId4 = "";
        var testTagName = getRandomString();

        before('Create tag to edit', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testTag4)
                .then((res) => {
                    testTagId4 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testTag4.name);
                });
        });

        it('should edit tags and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .put('/api/editTag')
                .send({
                    _id: testTagId4,
                    name: testTagName,
                    color: "#aaaaaa"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
            
            await chai
                .request(getBaseUrl())
                .get(`/api/getTag/${testTagId4}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.data.name).to.equal(testTagName);
                });
            
        });

        it('should not edit tags that are nonexistent and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .put('/api/editTag')
                .send({
                    _id: "notanId",
                    name: testTagName,
                    color: "#aaaaaa"
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });

        after('delete test tag', async () => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testTagId4}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });

    describe('delete tag tests', async() => {

        testTag5 = generateTag();
        var testTagId5 = "";
        var testTagName = getRandomString();

        before('Create tag to delete', async () => {
            await chai
                .request(getBaseUrl())
                .post('/api/saveTag')
                .send(testTag5)
                .then((res) => {
                    testTagId5 = res.body.data._id;
                    chai.expect(res).to.have.status(201);
                    chai.expect(res.body.data.name).to.equal(testTag5.name);
                });
        });

        it('should delete tag and return 200', async() => {
            await chai
                .request(getBaseUrl())
                .delete(`/api/deleteTag/${testTagId5}`)
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                });
            
            await chai
                .request(getBaseUrl())
                .get(`/api/getTag/${testTagId5}`)
                .query()
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(Object.keys(res.body).length).to.equal(0);
                });
            
        });

        it('should not delete tags that are nonexistent and return 400', async() => {
            await chai
                .request(getBaseUrl())
                .delete('/api/deleteTag/notatag')
                .send()
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                });
        });
    });
});