class Stashaway{
    constructor(referenceCode){
        this.referenceCode = referenceCode
        this.portfolios = []
        this.depositPlans = {
            monthly:{},
            oneTime:{}
        }
    }
    addPortfolio(pfs){
        this.portfolios[pfs]=0
        return {portfolios: this.portfolios}
    }
    addDepositPlan(portfolio, amount, type){
        if(this.portfolios.indexOf(portfolio)===-1){
            this.addPortfolio(portfolio)
        }
        if(type==='monthly'){
            this.depositPlans.monthly[portfolio]= amount
        }else if (type==="oneTime"){
            this.depositPlans.oneTime[portfolio] = amount
        }else{
            return {error:"type needs to be `monthly` or `oneTime`"}
        }
        
        return this.depositPlans
    }
    deposit(amount){
        if(this.depositPlans){
            for(const[key, value]of Object.entries(this.depositPlans.oneTime)){
                if(amount > 0 && this.portfolios[key]<value){
                    if(amount>=value){
                        this.portfolios[key]=value
                        amount = amount-value
                        amount
                    }else{
                        this.portfolios[key]= this.portfolios[key] + amount
                        amount = 0
                    }
                }
            }
            for(const[key, value]of Object.entries(this.depositPlans.monthly)){
                if(amount > 0){
                    if(amount>value){
                        this.portfolios[key]=value
                        amount = amount-value
                    }else{
                        this.portfolios[key]= this.portfolios[key]+amount
                        amount = 0
                    }
                }
            }
        }else{
            return {error:"first set deposit plans"}
        }
        return this.portfolios
    }
}
exports.Stashaway = Stashaway