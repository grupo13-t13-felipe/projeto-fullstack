function fibonacciNumbers() {
    let x = 0
    let x1 = 1
    for (let i = 0; i < 15; i++) {
        console.log(x)
        x2 = x + x1;
        x = x1;
        x1 = x2
    }
}
fibonacciNumbers()