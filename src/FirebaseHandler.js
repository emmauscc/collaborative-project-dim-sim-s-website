

const firebaseConfig = {
    apiKey: "AIzaSyBV4nXWhsM0VRWUTUXpb5C3UesQgk9eOuA",
    authDomain: "dimsims-webste.firebaseapp.com",
    databaseURL: "https://dimsims-webste-default-rtdb.firebaseio.com",
    projectId: "dimsims-webste",
    storageBucket: "dimsims-webste.appspot.com",
    messagingSenderId: "1048491640592",
    appId: "1:1048491640592:web:b26493fb73ac7af8fbc795",
    measurementId: "G-JK4SQYC925"
};

 

class FireBaseHandler{
    constructor(){

        this.start_firebase()

    }


    start_firebase = () => {
        this.app = firebase.initializeApp(firebaseConfig)

    }


    remove_specific_product = async (product_id) => {
        let k = firebase.database().ref('data/products/'+product_id)
        k.remove();
    }


    get_all_data = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                let product_info = firebase.database().ref('data/products')
                product_info.on('value',snapshot => {
                    var data = snapshot.val()
                    resolve(data)
                })
            },1)
        }).then((result) => {
            return result
        }) 
    }


    get_specific_product = (product_id) => {

        return new Promise((resolve,reject) => {
            setTimeout(() => {
                let product_info = firebase.database().ref('data/products/'+product_id)
                product_info.on('value',snapshot => {
                    var data = snapshot.val()
                    resolve(data)
                })
            },1)
        }).then((result) => {
            return result
        }) 
    }




    add_new_product = (product) => {
        firebase.database().ref('data/products/'+product.id).set(product)
    }
}