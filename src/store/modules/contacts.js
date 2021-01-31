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
        currentContactInInfo: null,

    },
    getters: {
        GET_ALL_CONTACTS(state) {
            return state.contacts;
        },
        GET_CURRENT_CONTACT(state) {
            return state.currentContactInInfo;
        }
    },
    mutations: {
        ADD_NEW_CONTACT(state, value) {
            state.contacts.push(value);
        },
        REMOVE_CONTACT(state, value) {
            state.contacts = state.contacts.filter(e => e.id !== value.id);
        },
        SET_CURRENT_CONTACT(state, value) {
            state.currentContactInInfo = state.contacts.find(e => e.id == value)
        },
        RENAME_KEY_IN_CURRENT_CONTACT(state, payload) {
            let values = Object.values(state.currentContactInInfo)
            let keys = Object.keys(state.currentContactInInfo);
            let newKeys = keys.map(key => {
                if (key == payload.keyOld) {
                    return key = payload.keyNew
                } else {
                    return key
                }
            })
            state.currentContactInInfo = Object.assign(...newKeys.map((n, i) => ({
                [n]: values[i]
            })))
            let index = state.contacts.findIndex(index => index.id == state.currentContactInInfo.id)
            state.contacts.splice(index, 1, state.currentContactInInfo) // update state.contacts after changing a key in currentContact
        },


    },
    actions: {
        DEFINE_NEW_CONTACT(context, value) {
            context.commit('ADD_NEW_CONTACT', value);
        },
        DEFINE_DELETING_CONTACT(context, value) {
            context.commit('REMOVE_CONTACT', value);
        },
        DEFINE_CURRENT_CONTACT(context, value) {
            context.commit('SET_CURRENT_CONTACT', value)
        },
        DEFINE_NEW_KEY_IN_CURRENT_CONTACT(context, payload) {
            context.commit('RENAME_KEY_IN_CURRENT_CONTACT', payload);
        }
    }
}