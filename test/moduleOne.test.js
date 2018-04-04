import test from 'ava';
import sinon from 'sinon';
import One from '../src/moduleOne';
import Helpers from '../src/moduleTwo';

let oneInstance,
    helpers;

test.beforeEach(t => {
    oneInstance = new One();
});

test('Sync Add method', t => {
    let result = oneInstance.syncAdd(5,3);
    t.truthy(result === 8, 'Add is working');
});

test('Sync Add with helpers method. <5', t => {
    sinon.spy(oneInstance.helpers, 'helperOne');
    
    let result = oneInstance.syncAddWithHelper(2, 3);
    t.truthy(result === 5, 'Add is working');
    t.truthy(oneInstance.helpers.helperOne.notCalled);
});

test('Sync Add with helpers method use spy. >5', t => {
    sinon.spy(oneInstance.helpers, 'helperOne');

    let result = oneInstance.syncAddWithHelper(2, 5);
    t.truthy(result === 7, 'Add is working');
    t.truthy(oneInstance.helpers.helperOne.calledOnce);

    t.truthy(oneInstance.helpers.helperOne.calledWith(result));
});

test('Sync Add with helpers method use stub. >5', t => {
    sinon.stub(oneInstance.helpers, 'helperOne');

    let result = oneInstance.syncAddWithHelper(2, 5);
    t.truthy(result === 7, 'Add is working');
    t.truthy(oneInstance.helpers.helperOne.calledOnce);

    t.truthy(oneInstance.helpers.helperOne.calledWith(result));
});

test('Sync Add with callback', t => {
    let cb = sinon.spy();

    oneInstance.syncAddWithCb(5, 5, 'some message', cb);

    t.truthy(cb.calledOnceWith('some message', 10));
});

test('Sync Add with Promise', t => {
    let cbSpy = sinon.spy();
    let a = 4, b = 3;
    sinon.stub(oneInstance.helpers, 'promiseToHelp').returns({ then: (cb) => { cb(a+b); } });
    oneInstance.syncAddWithPromise(a, b, cbSpy);

    t.truthy(cbSpy.calledOnce);
    t.truthy(cbSpy.calledOnceWith(a+b));
});