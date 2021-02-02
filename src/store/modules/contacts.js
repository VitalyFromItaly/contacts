export default {
    state: {
        contacts: [{
                id: 0,
                name: "Steve",
                surname: "Jobs",
                number: "+13049658492"
            },
            {
                id: 1,
                name: "Peter",
                surname: "Parker",
                number: "+134263812"
            },
            {
                id: 2,
                name: "Bill",
                surname: "Gates",
                number: "+4869302556"
            },
            {
                id: 3,
                name: "Vladimir",
                surname: "Ivanov",
                number: "+79124593123"
            }
        ],
        prevState: null,
        isActionHappened: false
    },
    getters: {
        //GET_PREV_ID(state) {
        //    return state.prevState.id
        //},
        GET_ALL_CONTACTS(state) {
            return state.contacts;
        },
        GET_CONTACT_BY_ID(state) {
            return id => state.contacts.find(item => {
                return item.id == id
            })
        },
        GET_ACTION_HAPPENED_STATE(state) {
            return state.isActionHappened
        },
        GET_ID: (state, allGetters, rootState) => rootState.route.params.id
    },
    mutations: {
        ADD_NEW_CONTACT(state, value) {
            state.contacts.push(value);
        },
        REMOVE_CONTACT(state, value) {
            state.contacts = state.contacts.filter(e => e.id !== value.id);
        },
        RENAME_KEY_IN_CURRENT_CONTACT(state, payload) {
            let newKeyAndValue = state.contacts.find(item => item.id == payload.id);
            console.log(newKeyAndValue);
            console.log(state.contacts[0])
            if (payload.keyOld !== payload.keyNew) {
                Object.defineProperty(newKeyAndValue, payload.keyNew,
                    Object.getOwnPropertyDescriptor(newKeyAndValue, payload.keyOld));
                delete newKeyAndValue[payload.keyOld]
            }
            console.log(state.contacts[0])
            newKeyAndValue[payload.keyNew] = payload.valueNew;
            console.log(state.contacts[0])
            state.contacts.splice(payload.id, 1, newKeyAndValue); // there is a bug instead of payload.id should be index of item
            console.log(state.contacts[0])
            state.isActionHappened = true;
            console.log(state.contacts[0])
        },
        ADD_NEW_FILED_TO_CONTACT(state, payload) {
            let newField = state.contacts.find(item => item.id == payload.id)
            newField[payload.newKey] = payload.newValue;
            state.isActionHappened = true;
        },
        DELETE_KEY_IN_CURRENT_CONTACT(state, payload) {
            let deleteKey = state.contacts.find(item => item.id == payload.id)
            delete deleteKey[payload.deletingKey]
            state.contacts.splice(payload.id, 1, deleteKey);
            state.isActionHappened = true;
        },
        SAVE_PREV_STATE(state, payload) {
            console.log(payload.id);
            //let index = state.contacts.findIndex(index => index.id == id)
            state.prevState = Object.assign({}, state.contacts.find(item => item.id == payload.id));
            //state.prevState = JSON.parse(JSON.stringify(state.contacts[payload.id]))
        },
        CANCEL_ACTION(state, id) {
            state.contacts.splice(id, 1, state.prevState)
            state.isActionHappened = false
        }
    },
    actions: {
        DEFINE_NEW_CONTACT(context, value) {
            context.commit('ADD_NEW_CONTACT', value);
        },
        DEFINE_DELETING_CONTACT(context, value) {
            context.commit('REMOVE_CONTACT', value);
        },
        async DEFINE_CHANGING_KEY_IN_CURRENT_CONTACT(context, payload) {
            await context.commit('SAVE_PREV_STATE', payload);
            context.commit('RENAME_KEY_IN_CURRENT_CONTACT', payload);
        },
        async DEFINE_NEW_FILED_TO_CONTACT(context, payload) {
            await context.commit('SAVE_PREV_STATE', payload);
            context.commit('ADD_NEW_FILED_TO_CONTACT', payload);
        },
        async DEFINE_DELETING_KEY(context, payload) {
            await context.commit('SAVE_PREV_STATE', payload);
            context.commit('DELETE_KEY_IN_CURRENT_CONTACT', payload);
        },
        CANCEL_PREV_ACTION(context, id) {
            context.commit('CANCEL_ACTION', id);
        }
    }
}