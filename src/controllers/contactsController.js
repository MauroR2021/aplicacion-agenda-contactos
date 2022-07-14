const controller = {};

// Mostrar lista de contactos
controller.list = (req, res) =>{
    // res.render('index');

    req.getConnection((err, conn) =>{

        const strquery = `SELECT 
                            dc.id,
                            dc.name,
                            dc.phone,
                            (SELECT DATE_FORMAT(dc.date, "%Y-%m-%d")) as date,
                            (select timestampdiff(YEAR, dc.date, CURDATE())) as years,
                            dc.address,
                            dc.email
                        FROM data_contacts dc`;

        conn.query(strquery, (err, info_contact) =>{
            if (err) {
                res.json(err);
            } else {
                res.render('index',{
                    data: info_contact
                });
            }
        });
    });
};

// Guardar un nuevo contacto
controller.save = (req, res) =>{

    const final_data = {...req.body};

    req.getConnection((err, conn) =>{
        if (err) {
            res.json(err);
        } else {

            conn.query('INSERT INTO data_contacts set ?', [final_data], (err, result) =>{
                res.redirect('/');
            });
        }
    });
};

// Editar un contacto: Mostrar la información en el formulario
controller.edit = (req, res) =>{

    const { id } = req.params;

    req.getConnection((error, conn) =>{
        if (error) {
            res.json(error);
        } else {

            const strquery = `SELECT 
                            dc.id,
                            dc.name,
                            dc.phone,
                            (SELECT DATE_FORMAT(dc.date, "%Y-%m-%d")) as date,
                            dc.address,
                            dc.email
                        FROM data_contacts dc WHERE dc.id = ?`;
            conn.query(strquery, [id], (errr, result) =>{

                res.render('contact_edit',{
                    data: result
                });
            });
        }
    });
};

// Actualizar información de contacto
controller.update = (req, res) =>{

    const { id } = req.params;
    const final_data = {...req.body}

    req.getConnection((err, conn) =>{
        if (err) {
            res.json(err);
        } else {
            conn.query('UPDATE data_contacts SET ? WHERE id= ?', [final_data, id], (err, result) =>{
                res.redirect('/');
            });
        }
    });
};

// Eliminar contacto
controller.delete = (req, res) =>{

    const {id} = req.params;
    req.getConnection((error, conn) =>{
        if (error) {
            res.json(error);
        } else {
            conn.query("DELETE FROM data_contacts WHERE id = ?", [id], (errr, result) =>{
                res.redirect('/');
            });
        }
    });
};

// Busqueda acorde al filtro
controller.filter = (req, res) =>{

    const {filter} = req.body;
    const {valuef} = req.body;

    if (filter === 'name') {
       
        var strquery = `SELECT 
                            dc.id,
                            dc.name,
                            dc.phone,
                            (SELECT DATE_FORMAT(dc.date, "%Y-%m-%d")) as date,
                            dc.address,
                            dc.email
                        FROM data_contacts dc WHERE dc.name like '%${valuef}%'`;
       
       } else if(filter === 'phone') {
        
        var strquery = `SELECT 
                            dc.id,
                            dc.name,
                            dc.phone,
                            (SELECT DATE_FORMAT(dc.date, "%Y-%m-%d")) as date,
                            dc.address,
                            dc.email
                        FROM data_contacts dc WHERE dc.phone like '%${valuef}%'`;
        
       }else{

        var strquery = `SELECT 
                            dc.id,
                            dc.name,
                            dc.phone,
                            (SELECT DATE_FORMAT(dc.date, "%Y-%m-%d")) as date,
                            dc.address,
                            dc.email
                        FROM data_contacts dc WHERE dc.email like '%${valuef}%'`;
       }

    req.getConnection((error, conn) =>{
        if (error) {
            res.json(error);
        } else {

            conn.query(strquery, (err, info_contact) =>{
                if (err) {
                    res.json(err);
                } else {
                    res.render('index',{
                        data: info_contact
                    });
                }
            });
        }
    });

};


export default controller