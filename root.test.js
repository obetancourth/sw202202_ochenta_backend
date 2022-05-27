describe(
  "Testing Jest Test Framework",
  ()=>{
    test(
      "Dado que a = 2 y b = 4",
      ()=>{
        let a = 2;
        let b = 4;
        expect(a + b).toBe(6);
      }
    );
  }
);
