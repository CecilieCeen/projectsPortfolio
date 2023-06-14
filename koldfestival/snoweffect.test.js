const Snoweffect = require("./snoweffect");
describe("Snow effect", () => {
    const snoweffect = new Snoweffect();
  
    test("update is function", () => {
        expect(typeof snoweffect.update).toBe("function");
    });
    test("Init is a function", ()=>{
        expect(typeof snoweffect.init).toBe("function");
    })
});