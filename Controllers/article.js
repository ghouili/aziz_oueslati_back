const bcrypt = require('bcryptjs');
const article = require('../Models/article');
const fs = require('fs')

const GetAll = async (req, res) => {

    let existarticles
    try {
        existarticles = await article.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existarticles });

}

const Create = async (req, res) => {

    const {
        serial_number,
        nom,
        etat,
        date,
        place,
        userid
    } = req.body;


    const Newarticle = new article({
        serial_number,
        nom,
        etat,
        date,
        place,
        userid,
    });

    try {
        await Newarticle.save();
    } catch (error) {
        console.log(req.body);
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while saving data', error: error })
    }
    return res.status(201).json({ success: true, message: 'success', data: Newarticle });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existarticle
    try {
        existarticle = await article.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existarticle) {
        return res.status(200).json({ success: false, messgae: 'article doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existarticle });

}

const Update = async (req, res) => {

    const { serial_number,
        nom,
        etat,
        date,
        place,
        userid,

    } = req.body;
    const { id } = req.params;

    let existarticle
    try {
        existarticle = await article.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existarticle) {
        return res.status(200).json({ success: false, messgae: 'article doesnt exist!!', error: false });
    }




    existarticle.serial_number = serial_number;
    existarticle.nom = nom;
    existarticle.etat = etat;
    existarticle.date = date;
    existarticle.place = place;
    existarticle.userid = userid;

    try {
        await existarticle.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existarticle });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existarticle
    try {
        existarticle = await article.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existarticle) {
        return res.status(200).json({ success: false, messge: 'article doesnt exist!!', error: false });
    }



    try {
        await existarticle.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'article Deleted Successfully' });

}

exports.GetAll = GetAll
exports.Create = Create
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete