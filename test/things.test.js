import { LocalApp } from '../localserver.js'
import supertest from 'supertest'


const api = supertest(LocalApp())

const commonHeaders = {
  "authorization": "Bearer "+process.env.TOKEN,
};


describe('GET /things', () => {
  test('Should return 401', async () => {
    const response = await api.get("/things");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test('Should return 200', async () => {
    await api.get("/things")
      .set(commonHeaders)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([
          {
            "id": "65b6c351179df29507b30db1",
            "name": "thingName",
            "year": 2010,
            "type": ["something"]
          },
          {
            "id": "65b6c351179df29507b30db2",
            "name": "thingName2",
            "year": 2010,
            "type": []
          }
        ]);
      })
  });
});


describe('GET /things/:id', () => {
  test('Should return 401', async () => {
    const response = await api.get("/things/65b6c351179df29507b30db1");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
  test('Should return 200', async () => {
    await api.get("/things/65b6c351179df29507b30db1")
      .set(commonHeaders)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": "65b6c351179df29507b30db1",
            "name": "thingName",
            "year": 2010,
            "type": ["something"]
          },
        );
      })
  });
  test('Should return 404', async () => {
    await api.get("/things/95b6c351179df29507b30db7")
      .set(commonHeaders)
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Thing not found"
          },
        );
      })
  });
});

describe('GET /things?type=something', () => {
  test('Should return 401', async () => {
    const response = await api.get("/things?type=something");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
  test('Should return 200', async () => {
    await api.get("/things?type=something")
      .set(commonHeaders)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([
          {
            "id": "65b6c351179df29507b30db1",
            "name": "thingName",
            "year": 2010,
            "type": ["something"]
          },
        ]);
      })
  });
  test('Should return 200', async () => {
    await api.get("/things?type=s")
      .set(commonHeaders)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          []
        );
      })
  });
});

describe('POST /things', () => {
  test('Should return 401', async () => {
    await api.post('/things').send({
      name: 'test4',
      year: 2002,
      type: ['something', 'nothing']
    }).expect(401)
  });

  test('Should return 200', async () => {
    await api.post('/things').send({
      name: 'test4',
      year: 2002,
      type: ['something', 'nothing']
    }).set(commonHeaders)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.name).toEqual("test4");
        expect(response.body.type).toEqual(['something', 'nothing']);
        expect(response.body.year).toEqual(2002);
      })
  }
  );
});

describe('PATCH /things/:id', () => {
  test('Should return 401', async () => {
    await api.patch('/things/65b6c351179df29507b30db1').send({
      year: 2009,
    }).expect(401)
  });

  test('Should return 200', async () => {
    await api.patch('/things/65b6c351179df29507b30db1').set(commonHeaders).send({
      year: 2009,
    }).expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "id": "65b6c351179df29507b30db1",
            "name": "thingName",
            "year": 2009,
            "type": ["something"]
          },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await api.patch('/things/65b6c351179df29507b30db9').set(commonHeaders).send({
      year: 2009,
    }).expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message": "Thing not found",
          },
        );
      })
  }
  );
});

describe('Delete /things:id', () => {
  test('Should return 401', async () => {
    await api.delete('/things/65b6c351179df29507b30db1').expect(401)
  });

  test('Should return 200', async () => {
    await await api.delete('/things/65b6c351179df29507b30db1').set(commonHeaders).expect(200)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message":"Thing deleted"
          },
        );
      })
  }
  );
  test('Should return 404', async () => {
    await await api.delete('/things/65b6c351179df29507b30db9').set(commonHeaders).expect(404)
      .then(response => {
        expect(response.body).toEqual(
          {
            "message":"Thing not found"
          },
        );
      })
  }
  );
});

