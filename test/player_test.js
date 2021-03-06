const expect  = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const request = require('request');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

let Player = require('./js/player.js');
let ServerPlayer = require('../server/player.js');

describe('Player', () => {

    let player = new Player(100, 100);

    it('Properties', () =>{

        expect(player).to.haveOwnProperty('speed').and.to.equal(5);

        expect(player).to.haveOwnProperty('maxhealth').and.to.equal(10);

        expect(player).to.haveOwnProperty('health').and.to.equal(10);

        expect(player).to.haveOwnProperty('maxresource').and.to.equal(10);

        expect(player).to.haveOwnProperty('resource').and.to.equal(10);

        expect(player).to.haveOwnProperty('score').and.to.equal(0);


    });

});

describe('Server Player', () => {

  it('Properties', () => {

    let server_player = new ServerPlayer();

    expect(server_player).to.haveOwnProperty('id');
  })

  it('#id()', () => {

    let server_player = new ServerPlayer(1328);

    expect(server_player.id).to.equal(1328);
  })
})
