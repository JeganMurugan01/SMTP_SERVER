const supertest = require("supertest");
const { app } = require("../app");

describe("GET API TEST CASE", () => {
    let id;
    let trashid;
    it("Get mail data with pagination", async () => {
        await supertest(app)
            .get("/api/mail?page=1&pageLimit=5")
            .expect((response) => {
                id = response?.body?.data[0]?.id;
                expect(response).toBeDefined();
                expect(response?.statusCode).toBe(200);
                expect(response?.body?.data?.length).toBeGreaterThan(0);
                if (response?.body?.data.length > 0) {
                    expect(response?.body?.data[0].from && response?.body?.data[0].to && response?.body?.data[0].id).toBeDefined();
                }
            });
    });
    it("Get mail data without pagination", async () => {
        await supertest(app)
            .get("/api/mail?page=&pageLimit=")
            .expect((response) => {
                expect(response).toBeDefined();
                expect(response.text).toBe("Mail fetch error");
            });
    });
    it("Get api check with id ", async () => {
        await supertest(app)
            .get(`/api/getmail?id=${id}`)
            .expect((response) => {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
                expect(response.body[0].id && response?.body[0].from && response?.body[0].to).toBeDefined();
                expect(response.body[0].id).toBe(id);
            });
    });
    it("Without giveing id data must be empty ", async () => {
        await supertest(app)
            .get("/api/getmail?id=")
            .expect((response) => {
                expect(response).toBeDefined();
                expect(response.status).toBe(500);
                expect(response.body).toEqual({});
            });
    });
    it("Passing a invalid id to get values", async () => {
        await supertest(app)
            .get("/api/getmail?id=1")
            .expect((response) => {
                expect(response).toBeDefined();
                expect(response.status).toBe(500);
                expect(response.text).toBe("Error fetching mail data");
            });
    });
    it("Trash get api with data ", async () => {
        await supertest(app)
            .get("/api/trash?page=2&pageLimit=20")
            .expect((response) => {
                trashid = response?.body?.data[0]?.id;
                expect(response).toBeDefined();
                expect(response?.statusCode).toBe(200);
                expect(response?.body?.data?.length).toBeGreaterThan(0);
                if (response?.body?.data.length > 0) {
                    expect(response?.body?.data[0].from && response?.body?.data[0].to && response?.body?.data[0].id).toBeDefined();
                }
            });
    });
    it("Trash getby ID", async () => {
        await supertest(app)
            .get(`/api/trashid?id=${trashid}`)
            .expect((response) => {
                expect(response).toBeDefined();
                expect(response?.statusCode).toBe(200);
            });
    });
    it("Search Api call", async () => {
        await supertest(app)
            .get("/api/search?title=sample")
            .expect((response) => {
                expect(response.body.data).toBeDefined();
                expect(response.body.data.length).toBeGreaterThan(0);
                expect(response?.statusCode).toBe(200);
                const responseDataContainsSample = response.body.data.some((item) => item.subject.includes("Sample") || item.title.includes("Sample"));
                expect(responseDataContainsSample).toBeTruthy();
            });
    });
    it("without giving any data in Search Api call", async () => {
        await supertest(app)
            .get(`/api/search?title="*"`)
            .expect((response) => {
                console.log(response.body.data, "response.body.data");
                expect(response.body.data).toBeDefined();
                expect(response.body.data).not.toBe(null);
                expect(response.body.data).toEqual("No data data found");
                expect(response?.statusCode).toBe(200);
                expect(response.body.data).not.toBe([
                    {
                        id: 19,
                        from: "smaple@example.com",
                        to: "Gokul053@gmail.com",
                        subject: "Zwiggy",
                        cc: "admin123@gmail.com",
                        bcc: "superadmin@gmail.com",
                        html: "<>",
                        text: "Food Order delevery from chnnai express",
                        title: "sample",
                        createdby: null,
                        Read: 1,
                        userid: 14,
                        tempdel: 1,
                    },
                ]);
            });
    });
});
