const { response } = require("express");
const { defaulMessage, defaultSucces } = require("../helpers/script");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return defaultSucces(res, events, "");
};

const creatEvents = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSave = await event.save();

    return defaultSucces(res, eventSave, "Evento guardado con existo", 201);
  } catch (err) {
    return defaulMessage(res, "Hable con el administrador", 500);
  }
};

const updateEvents = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return defaulMessage(res, "Evento no existe por ese id", 404);
    }
    if (event.user.toString() !== uid) {
      return defaulMessage(
        res,
        "No tienes persmiso para modificar este evento",
        401
      );
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };
    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    return defaultSucces(
      res,
      eventUpdate,
      "Evento actualizado con existo",
      200
    );
  } catch (err) {
    return defaulMessage(res, "Hable con el administrador", 500);
  }
};

const deleletEvents = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return defaulMessage(res, "Evento no existe por ese id", 404);
    }
    if (event.user.toString() !== uid) {
      return defaulMessage(
        res,
        "No tienes persmiso para eliminar este evento",
        401
      );
    }
    await Event.findOneAndDelete(eventId);
    return defaulMessage(res, "Evento eliminado con exito", 200);
  } catch (err) {
    return defaulMessage(res, "Hable con el administrador", 500);
  }
};

module.exports = {
  getEvents,
  creatEvents,
  updateEvents,
  deleletEvents,
};
