d3.csv('athletes_sochi.csv', function(err, dataset){
    
    console.log(dataset)
    
    var minor21Age = dataset.filter(function(d){
        return d.age <= 21
    })
    
    console.log(minor21Age)
    
    var byGender = d3.nest()
                    .key(function(d, i){
                        return d.country
                    })
//                    .key(function(d, i){
//                        return d.gender
//                    })
                    .sortKeys(d3.ascending)
                    .entries(dataset)
    
    console.log(byGender)
    
    byGender.sort(function(a, b){
        return d3.ascending(a.values.length, b.values.length)
    })
    
    
    
    
})