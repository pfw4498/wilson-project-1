const characters = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getCharacters = (request, response) => {
  const responseJSON = {
    characters,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getCharactersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'At least a name is required',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (characters[body.name]) {
    responseCode = 204;
  } else {
    characters[body.name] = {};
  }

  characters[body.name].name = body.name;
  characters[body.name].str = body.str;
  characters[body.name].dex = body.dex;
  characters[body.name].con = body.con;
  characters[body.name].int = body.int;
  characters[body.name].wis = body.wis;
  characters[body.name].cha = body.cha;
  characters[body.name].maxHp = body.maxHp;
  characters[body.name].curHp = body.curHp;
  characters[body.name].ac = body.ac;
  characters[body.name].init = body.init;
  characters[body.name].speed = body.speed;
  characters[body.name].class = body.class;
  characters[body.name].lvl = body.lvl;
  characters[body.name].race = body.race;
  characters[body.name].align = body.align;
  if (body.inventory) {
    characters[body.name].inventory = body.inventory;
  }
  else {
    characters[body.name].inventory = [""];
  }
    
  if (body.weapon) {
    characters[body.name].weapon = body.weapon;
  }
  else {
    characters[body.name].weapon = [""];
  }
    
  if (body.spellList) {
    characters[body.name].spellList = body.spellList;
  }
  else {
    characters[body.name].spellList = [""];
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you were looking for is not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getCharacters,
  getCharactersMeta,
  addCharacter,
  notFound,
  notFoundMeta,
};
