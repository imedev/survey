import {defineStore} from 'pinia';

interface IUser {
    token: string;
    gender: string,
    age: number,
    license: boolean,
    fuel: { code: boolean | string, name: string },
    drivetrain: { name: string, code: string },
    countCars: number,
    carInfos: object[],
    firstCar: boolean | null,

}

export const useUsers = defineStore('users', {

    state: () => ({
        loading: false,
        error: null,

        users: [] as IUser[]
    }),
    getters: {

        getUsers(): IUser[] {
            return this.users;
        },
        getadolescentsUsers(): number {
            return (this.users.filter(ar => ar.age < 18)).length;
        },
        getunlicensedUsers(): number {
            return (this.users.filter(ar => ar.license === false)).length;
        },
        getfirstimersUsers(): number {
            return (this.users.filter(ar => ar.age > 18 && ar.age < 25)).length;
        },
        getargetablesUsers(): number {

            return this.users.length;

        },
        getFuelEmissionUsers(): number {
            return (this.users.filter(ar => ar.fuel.code === true)).length;
        },
        getFilterByDrivetrainUsers(): number {
            return (this.users.filter(ar => ar.drivetrain.code === "No" || ar.drivetrain.code === "FWD")).length;
        },


    },
    actions: {
        addUser(info: IUser) {
            this.users.push(info);
        },


    }
});
