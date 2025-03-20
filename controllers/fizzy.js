const noCount = async (req, res) => {
    res.status(200).json({ message: "No count... insert a count in the URL to see Fizz-Buzz in action!"})
}

const hasCount = async (req, res) => {
    const maxcount = Number(req.params.count)

    if(maxcount) { 
        try {
            let arr = []
        
            for(count = 0; count <= maxcount; count++) {
                if(count != 0) {
                    if(count % 3 == 0 && count % 5 == 0) {
                        arr.push(`[ ${count} fizz-buzz ]`)
                    } else if(count % 3 == 0) {
                        arr.push(`[ ${count} fizz ]`)
                    } else if(count % 5 == 0) {
                        arr.push(`[ ${count} buzz ]`)
                    }
                }
                count++
            }
            let str = arr.join(' ')
            res.status(200).json({ message: str })
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    } else {
        res.status(200).json({ message: "Count must be a number" })
    }
}


module.exports = {
    noCount,
    hasCount
}