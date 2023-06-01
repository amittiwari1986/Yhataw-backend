const countryOperations = require("../services/countryService");
const Country = require("../dto/countryto");
const stateOperations = require("../services/stateService");
const State = require("../dto/stateto");
const jwt = require("jsonwebtoken");


//User countru
const getCountry = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
             const query = req.query.new 
            const promise = countryOperations.getAllCountry(query)
            promise
            .then((data)=>{
                console.log(data)
                const {others} = data
                res.status(200).json({
                    data: data,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
            });
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addCountry = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const country = new Country(
      req.body.country_name,
      req.body.country_code,
      req.body.currency,
    );
    const promise = countryOperations.addcountry(country);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
        if(err.keyPattern){
          res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const getState = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
             const query = req.query.new 
            const promise = stateOperations.getAllState(query)
            promise
            .then((data)=>{
                console.log(data)
                const {others} = data
                res.status(200).json({
                    data: data,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
            });
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addState = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const state = new State(
      req.body.countryId,
      req.body.state_name,
    );
    const promise = stateOperations.addstate(state);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
        if(err.keyPattern){
          res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

module.exports = { getCountry,addCountry,getState,addState }