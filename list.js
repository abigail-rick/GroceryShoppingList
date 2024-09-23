
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://groceryshoppinglist-a4f23-default-rtdb.firebaseio.com/"
    }

const app = initializeApp(appSettings);
const database = getDatabase(app);
const groceriesinDB = ref(database, "groceries");

const addItemBtn = document.getElementById('addItem');
const inputItem = document.getElementById('inputItem');
const shoppingList = document.getElementById('shoppingList');

addItemBtn.addEventListener("click", function(){
    let inputValue = inputItem.value;
    push(groceriesinDB, inputValue);
    inputItem.value = "";
});

onValue(groceriesinDB, function(snapshot){
    if (snapshot.exists()){
       let itemArray = Object.entries(snapshot.val());

    shoppingList.innerHTML = "";

    for(let i = 0; i < itemArray.length; i++){
        let currentItem = itemArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];
        
        AddToCart(currentItem);
    }
} else {
    shoppingList.innerHTML = "No items in your cart";
}
});

function AddToCart(item){
let itemID = item[0];
let itemValue = item[1];

let newEl = document.createElement("li");
newEl.textContent = itemValue;

newEl.addEventListener("click", function(){
    let removeItem = ref(database, `groceries/${itemID}`);
        remove(removeItem);

});
shoppingList.append(newEl);
}




