

const firebaseConfig = {
    apiKey: "AIzaSyD8THmhiu-yyHXJZVy2BbsL1Vvep7cqds8",
    authDomain: "dim-sim-s-website.firebaseapp.com",
    databaseURL: "https://dim-sim-s-website-default-rtdb.firebaseio.com",
    projectId: "dim-sim-s-website",
    storageBucket: "dim-sim-s-website.appspot.com",
    messagingSenderId: "1079766995401",
    appId: "1:1079766995401:web:96f174fc09f1a09b2f9818"

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