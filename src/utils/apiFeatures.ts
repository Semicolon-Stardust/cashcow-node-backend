class ApiFeatures{
    query : any;
    queryStr : any;
    constructor(query :any, queryStr :any){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ?
        {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
            
        } : {};

        this.query = this.query.find({...keyword});
        return this
    }


    filter(){
        const queryCopy = {...this.queryStr};

        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key=>delete queryCopy[key]);

        // Filter For Price and  Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|lt|lte|gte)\b/g, key=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    pagination(resultPerPage : number){
        
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this
    }

}

export default ApiFeatures;