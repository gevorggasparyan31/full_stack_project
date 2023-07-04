import { BaseItem, Item } from './item.interface';
import { db } from '../db';

export const findAll = async (): Promise<Item[]> => {
  try {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM items');
    return rows as Item[];
  } catch (e: any) {
    throw e;
  }
};

export const find = async (id: number): Promise<Item | null> => {
  try {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    const item = Array.isArray(rows) ? (rows[0] as Item) : null;
    return item;
  } catch (e: any) {
    throw e;
  }
};

export const create = async (newItem: BaseItem): Promise<Item> => {
  try {
    const connection = await db;
    const [result] = await connection.query('INSERT INTO items SET ?', newItem);
    const id = (result as any).insertId;

    const createdItem = {
      id,
      ...newItem,
    };

    return createdItem;
  } catch (e: any) {
    throw e;
  }
};

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  const connection = await db;
  await connection.query('UPDATE items SET ? WHERE id = ?', [itemUpdate, id]);
  const updatedItem = { id, ...itemUpdate };
  return updatedItem;
};

export const remove = async (id: number): Promise<void> => {
  const connection = await db;
  await connection.query('DELETE FROM items WHERE id = ?', [id]);
};
