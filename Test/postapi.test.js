const supertest = require("supertest");
const { app } = require("../app");

describe("Trash API", () => {
    const mailid = "Testcasemail@gmail.com";
    let id;
    it("Post mail api call ", async () => {
        const body = {
            From: "Testcasemail@gmail.com",
            To: "Testcasemail@gmail.com",
            Subject: "Leave Application for 2 Days",
            Text: "Hello Team,\n\nI trust this email finds you in good health. I'm writing to request a two-day leave due to personal commitments that require my attention. I will ensure that my work is up to date and provide assistance for a smooth workflow during my absence.\n\nThank you for your understanding.\n\nBest regards,\nAiden Wilson",
            Cc: "MiaThompson@gmail.com",
            Html: "<p> </p>",
            Bcc: "Supervisor@gmail.com",
            Title: "Leave Application",
            CreatedBy: "2023-08-30 17:45:00",
        };
        await supertest(app)
            .post("/api/mail")
            .set("Accept", "application/json")
            .send(body)
            .expect((response) => {
                console.log(response.body.Data, "response.body.Data");
                expect(response.body.Data).toBe("Mail sent successfully!");
                expect(response.status).toBe(200);
                expect(response.body.Data.length).toBeGreaterThan(0);
                expect(response.body.Data).not.toBe(null);
            });
    });

    it("Search Api call", async () => {
        await supertest(app)
            .get(`/api/filtermail?mailid=${mailid}`)
            .expect((response) => {
                id = response.body[0].id;
                expect(response.body).toBeDefined();
                expect(response.body.length).toBeGreaterThan(0);
                expect(response?.statusCode).toBe(200);
                const responseDataContainsSample = response.body.some((item) => item.from.includes(mailid) || item.to.includes(mailid));
                expect(responseDataContainsSample).toBeTruthy();
                console.log(response.body[0].id, "id from the mail search");
            });
    });

    it("Status update using PUT API call", async () => {
        let payload = {
            id: id,
            Read: 1,
        };
        await supertest(app)
            .put("/api/updatestatus")
            .send(payload)
            .expect((response) => {
                expect(response.body.data).toBeDefined();
                expect(response.statusCode).toBe(200);
                expect(response.body.data).toBe("Updated successfully!")
                expect(response.body.data).not.toBe(null||"")
            });
    });
    it("Status update using PUT API call id  with null ", async () => {
        let payload = {
            id: null,
            Read: 1,
        };
        await supertest(app)
            .put("/api/updatestatus")
            .send(payload)
            .expect((response) => {
                expect(response?.body?.error).toBeDefined();
                expect(response.statusCode).toBe(400);
                expect(response?.body?.error).toBe("No data found for the given id.")
                expect(response?.body?.error).not.toBe(null||"")
            });
    });

    it("Delete the mail from the list", async () => {
        await supertest(app)
            .delete("/api/deletemail")
            .send({ id })
            .expect((response) => {
                expect(response.body.data).toBeDefined();
                expect(response.statusCode).toBe(200);
                expect(response.body.data).toBe("Mail deleted successfully");
                expect(response.statusCode).not.toBe(400);
                expect(response.body.data).not.toBe({} || "");
                expect(response.body.data).not.toBe(null);
            });
    });

    it("Delete mail by email id", async () => {
        console.log(id, "id ");
        await supertest(app)
            .delete(`/api/trashid`)
            .send({ id })
            .expect((response) => {
                console.log(response.body, "delete by id");
                expect(response.status).toBe(200);
                expect(response.body.Data).toBeDefined();
                expect(response.body.Data).toBe("Mail deleted successfully");
                expect(response.body.Data).not.toBe(null);
                expect(response.body.Data).not.toBe("");
            });
    });

    // it("Delete all mail", async () => {
    //     await supertest(app)
    //         .delete("/api/deleteall")
    //         .expect((response) => {
    //             console.log(response.body.data, "response.body.data from deleteall");
    //         });
    // });
});
