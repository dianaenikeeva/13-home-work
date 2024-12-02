import { expect } from 'chai';
import sinon from 'sinon';
import { fetchUsers } from '../userServise.js';

describe('fetchUsers', () => {
  let clock;
  let fetchStub;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    clock.restore();
    fetchStub.restore(); 
  });

  it('должен прийти массив пользователей', async () => {
    fetchStub.resolves({
      ok: true,
      json: async () => [
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' },
        { id: 3, name: 'Clementine Bauch' },
        { id: 4, name: 'Patricia Lebsack' },
        { id: 5, name: 'Chelsey Dietrich' },
        { id: 6, name: 'Mrs. Dennis Schulist' },
        { id: 7, name: 'Kurtis Weissnat' },
        { id: 8, name: 'Nicholas Runolfsdottir V' },
        { id: 9, name: 'Glenna Reichert' },
        { id: 10, name: 'Clementina DuBuque' },
      ],
    });

    const users = await fetchUsers();
    expect(users).to.be.an('array');
    expect(users).to.have.lengthOf(10); 
  });

  it('Должен прийти пустой массив, если нет пользователей', async () => {
    fetchStub.resolves({ ok: true, json: async () => [] });    

    const users = await fetchUsers();
    
    expect(users).to.be.an('array');
    expect(users).to.have.lengthOf(0); 
  });

  it('Должен прийти список пользователей', async () => {
    fetchStub.resolves({ ok: true, json: async () => [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
      { id: 3, name: 'Clementine Bauch' },
      { id: 4, name: 'Patricia Lebsack' },
      { id: 5, name: 'Chelsey Dietrich' },
      { id: 6, name: 'Mrs. Dennis Schulist' },
      { id: 7, name: 'Kurtis Weissnat' },
      { id: 8, name: 'Nicholas Runolfsdottir V' },
      { id: 9, name: 'Glenna Reichert' },
      { id: 10, name: 'Clementina DuBuque' },
    ] }); 

    const users = await fetchUsers(); 
    expect(users).to.have.lengthOf(10); 
  });

  it('Должен прийти первый пользователь', async () => {
    fetchStub.resolves({ ok: true, json: async () => [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
      { id: 3, name: 'Clementine Bauch' },
    ] }); 

    const users = await fetchUsers();
    expect(users[0]).to.have.property('name', 'Leanne Graham'); 
  }).timeout(1000);
});