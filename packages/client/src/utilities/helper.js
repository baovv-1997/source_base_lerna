import _, { isObject, isArray } from 'lodash';
import Router from 'next/router';

export const checkShallowObjectIsEmpty = (object) => {
  if (!_.isObject(object)) {
    return true;
  }
  const keys = Object.keys(object);

  if (keys.length === 0) {
    return true;
  }

  let isEmptyProperties = true;

  keys.forEach((key) => {
    if (!_.isEmpty(object[key])) {
      isEmptyProperties = false;
    }
  });

  return isEmptyProperties;
};

export const getTitleFromContentHTML = (content) => {
  const indexEndLine = content.indexOf('</');
  if (indexEndLine === -1) {
    return '';
  }
  const firstLine = content.slice(0, indexEndLine);
  const title = firstLine.replace(/<[^>]*>/g, '');

  return title;
};

export const convertObjectToArray = (objectOrig) => {
  if (!isObject(objectOrig)) {
    return [];
  }

  return Object.keys(objectOrig).map((key) => ({ ...objectOrig[key], id: key }));
};

export const checkCollectionHasValue = (collection, key, value) => {
  if (!isArray(collection)) {
    return false;
  }

  const collectionLength = collection.length;
  for (let index = 0; index < collectionLength; index++) {
    const item = collection[index];

    if (!isObject(item)) {
      continue;
    }

    if (item[key] === value) {
      return true;
    }
  }

  return false;
};

export const removeUndefinedProps = (objectOrig) => {
  if (!isObject(objectOrig)) {
    return objectOrig;
  }

  Object.keys(objectOrig).map((key) => {
    if (objectOrig[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete objectOrig[key];
    }
    return null;
  });

  return objectOrig;
};

export const delay = async (timeout = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('OK'), timeout);
  });
};

export const redirect = (path) => {
  if (typeof window === 'undefined') {
    return;
  }

  Router.push(path);
};
