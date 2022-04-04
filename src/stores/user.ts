import {defineStore} from 'pinia';

interface IUser {
    token: string;
    gender: string,
    age: number,
    license: boolean | null,
    fuel: { code: boolean | string, name: string },
    drivetrain: { name: string, code: string },
    countCars: number,
    carInfos: object[],
    firstCar: boolean | null,


}

export interface IUserState {
    userInfo: IUser;
}

export const useUser = defineStore('user', {

    state: () => ({
        loading: false,
        error: null,
        counter: 0,
        userInfo: {
            token: '',
            gender: "",
            age: 0,
            license: null,
            fuel: {code: "", name: ""},
            drivetrain: {name: "", code: ""},
            countCars: 0,
            carInfos: [
                {
                    carModel: "",
                    carBrand: ""
                }
            ],
            firstCar: null

        } as IUser,

    }),
    getters: {
        getInfoUser(): IUser {

            return this.userInfo;
        },


    },
    actions: {
        updateUser(info: IUser) {
            this.userInfo = info;
        },
        updatePersonal(token: string, gender: string, age: number) {
            this.userInfo.token = token;
            this.userInfo.gender = gender;
            this.userInfo.age = age;
        },
        updateLicense(license: boolean) {
            this.userInfo.license = license;
        },
        updateCar(car: boolean) {
            this.userInfo.firstCar = car;
        },
        updateToken(token: string) {
            this.userInfo.token = token;
        },
        updateCarInfos(
            fuel: object,
            drivetrain: object,
            countCars: number,
            carInfos: object[]
        ) {
            this.userInfo.fuel = fuel;
            this.userInfo.drivetrain = drivetrain;
            this.userInfo.countCars = countCars;
            this.userInfo.carInfos = carInfos;


        }
    }
});
