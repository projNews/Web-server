import { Router } from 'express';
import { isObject, isString, isNumber } from 'util';

import { Users } from '../models/Users';

const app = Router();

interface RegForm {
  name: string;
  surname: string;
  country: string;
  city: string;

  height: number;
  weight: number;
  birthday: number;

  hairColor: string;
  eyesColor: string;
  telefon: string;
  email: string;
  password: string;
}

const isRegForm = (data: RegForm): data is RegForm => (
  isObject(data) &&

  isString(data.name) &&
  isString(data.surname) &&
  isString(data.country) &&
  isString(data.city) &&

  isNumber(data.height) &&
  isNumber(data.weight) &&
  isNumber(data.birthday) &&

  isString(data.hairColor) &&
  isString(data.eyesColor) &&
  isString(data.telefon) &&
  isString(data.email) &&
  isString(data.password)
);

app.post('/reg', async (req, res) => {
  const regForm: RegForm = req.body;

  if (!isRegForm(regForm)) {
    throw new Error();
  }

  await req.database.manager.insert(Users, regForm);

  res.end();
});

export default app;



// TEST

const test: RegForm = {
  "name": "",
  "surname": "",
  "country": "",
  "city": "",

  "height": 0,
  "weight": 0,
  "birthday": 0,

  "hairColor": "",
  "eyesColor": "",
  "telefon": "",
  "email": "",
  "password": ""
};
