import bcrypt from "bcrypt";
import { config } from "../config/env.js";

export const encriptar = async (texto) => {
  try {
    const saltRounds = config.BCRYPT_SALT_ROUNDS;
    const hash = await bcrypt.hash(texto, saltRounds);
    return hash;
  } catch (error) {
    logger.error(error);
    throw new Error("Error al encriptar la contraseña");
  }
};

export const comparar = async (texto, hash) => {
  try {
    return await bcrypt.compare(texto.hash);
  } catch (error) {
    logger.error(error);
    throw new Error("Error al comparar contraseña");
  }
};
