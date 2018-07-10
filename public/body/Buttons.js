var nbElements = 0;

function MyButtonsFunction() {
    console.log("yolo");
    this.nbElements++;
    document.querySelector(".list").textContent = (document.querySelector(".list").textContent == "Test") ?
        "Show List" : "Test" ;
    document.querySelector(".flip-container").classList.toggle('test');
}