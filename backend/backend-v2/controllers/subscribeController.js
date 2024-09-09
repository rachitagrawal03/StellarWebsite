import subscribeModel from "../models/subscribeModel.js";

const subscribeNewsletter = async(req, res) => {
    try {
        let check = await subscribeModel.findOne({email: req.body.email});
        if(check){
            return res.status(400).json({success: false, errors: "exisiting email found"})
        }

        const subscriber = new subscribeModel({
            email: req.body.email,
        })

        await subscriber.save();
        res.status(200).json({
            success: true, 
            message: `${subscriber} successfully subscribed for newsletter`})
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error
        })
    }
}

export {subscribeNewsletter}