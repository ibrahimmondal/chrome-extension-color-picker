const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".all-clear");
const colorList = document.querySelector(".all-color");
// const colorWrapper = document.querySelector("#color-pickers");

// let pickerColor = [];
let pickerColor = JSON.parse(localStorage.getItem("pickerColor") || "[]");

// if(pickerColor.length == 0){
//     colorWrapper.style.display = "none";
// }

const activateEyeDropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        console.log(eyeDropper);
        const colorCode = await eyeDropper.open();
        console.log(colorCode.sRGBHex);
        navigator.clipboard.writeText(colorCode.sRGBHex);
        pickerColor.push(colorCode.sRGBHex);
        showColor();
        localStorage.setItem("picker-color", JSON.stringify(pickerColor));
        // colorWrapper.style.display = 'block';
        console.log(pickerColor); 
          
    } catch (error) {
        alert("Failed");
    };    
};
const showColor = () => {
    if (pickerColor.length > 0) {
        colorList.innerHTML = pickerColor.map(
            (color) =>   
                `    
            <li class="color">
                <span class="rect" style="background-color:${color}"></span>
                <span class="value-hex">${color}</span>
              </li>
              `    
        )
        .join("")
    } 
        
}

const clearAllColor = () => {
    colorList.innerHTML = "";
    pickerColor = [];
    // colorWrapper.style.display = 'none';
}

clearAll.addEventListener("click", clearAllColor);
colorPickerBtn.addEventListener("click", activateEyeDropper);




