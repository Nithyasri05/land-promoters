class ApiFeatures {
    constructor(quary,quarystr){
        this.quary=quary;
        this.quarystr=quarystr
    }
    search(){
       let keyword= this.quarystr.keyword ? {
        author:{
                $regex:this.quarystr.keyword,
                $options:"i"
            }
        }:{}
        this.quary.find({...keyword})
        return this;
    }
    filter(){
        const quarystrcopy={...this.quarystr} 
        const removeingfields=['keyword','limit','page'];
        removeingfields.forEach(fields => delete quarystrcopy[fields])
        let quarystr=JSON.stringify(quarystrcopy)
        quarystr.replace(/\b(gt|lt|gte|lte)/g, match=>`$${match}`)
        this.quary.find(JSON.parse(quarystr))    
        return this
    }

    pageinate(resperpage){
        const currentpage= Number(this.quarystr.page)|| 1;
        const skip = resperpage*currentpage-1
        this.quary.limit(resperpage).skip(skip);
        return this

    }
}
module.exports=ApiFeatures