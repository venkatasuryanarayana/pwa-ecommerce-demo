// jshint esversion: 6
import Cart from 'modules/cart';

QUnit.module('Cart');

QUnit.test('default values', assert => {
    const cart = new Cart();
    assert.equal(cart.length, 0, 'cart starts empty');
    assert.equal(cart.total, 0, 'no price');
  });

QUnit.test('adding a valid order', assert => {
    const cart = new Cart();
    let entry = cart.add('C10');
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 1, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(entry.price, entry.total, 'total');
  });

  QUnit.test('adding a valid order with quantity > 1', assert => {
      const cart = new Cart();
      let entry = cart.add('C10', 3);
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.sku, 'C10', 'sku');
      assert.equal(entry.quantity, 3, 'quantity');
      assert.ok(entry.title, 'title');
      assert.ok(entry.price, 'price');
      assert.equal(3 * entry.price, entry.total, 'total');
    });

QUnit.test('finding a new order', assert => {
    const cart = new Cart();
    cart.add('C10');
    let entry = cart.findOrder('C10');
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 1, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(entry.price, entry.total, 'total');
  });

QUnit.test('merging orders for the same SKU', assert => {
    const cart = new Cart();
    cart.add('C10');
    cart.add('C10');
    let entry = cart.findOrder('C10');
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 2, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(2 * entry.price, entry.total, 'total');
  });

QUnit.test('resetting the order count', assert => {
    const cart = new Cart();
    cart.add('C10', 4);
    cart.change('C10', 2);
    assert.equal(cart.findOrder('C10').quantity, 2, 'removed');
  });

QUnit.test('removing an order', assert => {
    const cart = new Cart();
    cart.add('C10');
    cart.remove('C10');
    assert.equal(cart.findOrder('C10'), null, 'removed');
  });

QUnit.test('resetting the cart', assert => {
    const cart = new Cart();
    cart.add('C10');
    cart.reset();
    assert.equal(cart.length, 0, 'removed');
  });
