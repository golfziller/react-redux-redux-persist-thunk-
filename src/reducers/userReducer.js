


export default function reducer(state = {
    
        userId: null,
        create: null,
        token: null
    
}, action) {
    switch (action.type) {
        case "SET_LOGIN": {
            return {
                
                user:  action.payload 
            }
        }
        default:
            return state;
    }
}
// export function reducer(state = [], action) {
//     switch (action.type) {
//         case 'SET_LOGIN':
//             return action.items;

//         default:
//             return state;
//     }
// }
