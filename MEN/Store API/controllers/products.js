const Product = require("../models/product")


const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,numericFilters} = req.query
    queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'?true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    if(numericFilters){
        const operatoMap = {
            '>' : '$gt',
            '<' : '$lt',
            '>=' : '$gte',
            '<=' : '$lte',
            '=' : '$eq',
        }
        const regEx = /\b(>|<|>=|<=|=)\b/g
        const numericFields = ['rating','price']
        let filters = numericFilters.replace(regEx,(match)=>`-${operatoMap[match]}-`)
        const filtersList = filters.split(',').forEach((filter)=>{
            const [field,ope,val] = filter.split('-')
            console.log(field);
            if(numericFields.includes(field)){
                queryObject[field] = {[ope]:Number(val)}
                console.log(field);
            }
        })
        console.log(queryObject);
    }


    let result =  Product.find(queryObject)
    if(sort){
        sortList = sort.split(',').join(" ")
        result = result.sort(sortList)
    }
    else{
        result = result.sort('-name')
    }
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page-1)*limit
    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({Count:products.length,products})
    
}

const getAllProductsStatic = async (req,res) => {
    // const search = 'ab'
    // const products = await Product.find({
    //     name : {$regex:search, $options:'i'}
    // })
    const sort = {name: 1}
    const products = await Product.find({}).sort("-name")
    res.status(200).json({Count:products.length,products})
    
}
 
module.exports = {getAllProducts,getAllProductsStatic}