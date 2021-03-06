const allProducts = Vue.createApp({
  data(){
    return{
      products: []
    }
  },
  mounted(){
    let products = JSON.parse(document.getElementById("allProducts").getAttribute("data-allProducts"));
    this.products = products
    console.log(this.products)
    
  },

})

if(document.getElementById("allProducts")){const mountedAllProducts = allProducts.mount("#allProducts")}

const soldProducts = Vue.createApp({
  data(){
    return{
      products: [],
      productsOrigin: [],
      sellers:[],
      sellerFilter:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    let products = JSON.parse(document.getElementById("soldProducts").getAttribute("data-allProducts"));
    let sellers = JSON.parse(document.getElementById("soldProducts").getAttribute("data-allSellers"));
    this.productsOrigin = products
    this.products = this.productsOrigin
    this.sellers = sellers
    
  },
  methods:{
    setProducts() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.products.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(products) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return products.slice(from, to);
    },
    filterPerSelect(){
      if(this.sellerFilter!=''){
        this.products = this.productsOrigin.filter((p)=>{return p.customer._id.toString()==this.sellerFilter})
      }else{
        this.products= this.productsOrigin
      }
    }
  },
  watch:{
    products(){
      this.setProducts()
    },
    sellerFilter(){
      this.filterPerSelect()
    }
  },
  computed:{
    displayedProducts: function(){
      return this.paginate(this.products)
    }
  }
})

if(document.getElementById("soldProducts")){const mountedSoldProducts = soldProducts.mount("#soldProducts")}

const productDetail = Vue.createApp({
  data(){
    return{
      productDetail: [],
      subCategory: {},
      category: {}
    }
  },
  mounted(){
    let productDetail = JSON.parse(document.getElementById("productDetail").getAttribute("data-productDetail"));
    this.productDetail = productDetail
    this.subCategory = productDetail.subCategory
    this.category = productDetail.category
    console.log(this.productDetail, this.subCategory, this.category)  
  },

})

if(document.getElementById("productDetail")){const mountedProductDetail = productDetail.mount("#productDetail")}