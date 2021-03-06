var financial = require('../models').financial;

module.exports = {
    listAll(req,res){
        return financial
            .all()
            .then( (com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return financial
            .findAll({where: {student_id: req.params.student_id}})
            .then( (com) =>  res.status(200).send(com) )
            .catch( (error) => res.status(200).send(error) );
    },
    insertNewData(req,res){
        return financial
            .create({
                student_id: req.params.student_id,
                item: req.body.item,
                term: req.body.term,
                due_date: req.body.due_date,
                charge: req.body.charge,
                payment: req.body.payment
            })
            .then( (com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },

    destroy(req,res){
        return financial
            .findById(req.body.id)
            .then(fin => {
            	if (!fin) {
                    return res.status(400).send({
                        message: 'fin Not Found',
                    });
                }
                fin
                    .destroy()
                    .then( (fin) => res.status(201).send(fin))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    /* -------------------------------------------------------------------------------------
    *                             RETURN QUERY FROM MODEL 
    * ------------------------------------------------------------------------------------- */


    getTotalCharge(uid){
        return financial
            .sum('charge', {where:{student_id:uid}})
    },

    getTotalPayment(uid){
    	return financial
    		.sum('payment', {where:{student_id:uid}})
    },

    getFinancialDetails(uid){
        return financial
            .findAll({where: {student_id:uid},
                      raw: true,
                      order: '"id" DESC'})
    },
};
