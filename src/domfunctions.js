export function openNav() {
    console.log('im a button');
    document.getElementById("test").style.backgroundColor = "black";
    if (document.getElementsByClassName("navbar")[0].style.left !== "0" ) {
        document.getElementsByClassName("navbar")[0].style.left = "0";
    } 
    if (document.getElementsByClassName("navbar")[0].style.left === "0") {
        console.log('running')
    
        document.getElementsByClassName("navbar")[0].style.left = "-200px";
    }
    

  }