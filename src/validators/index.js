import { body } from "express-validator"

// validation for all the controllers 
// userregistration validator
const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({ min: 3 }).withMessage("username should be at least 3 character")
            .isLength({ max: 13 }).withMessage("username can not exceed 13 character"),
        body("password")
            .trim()
            .notEmpty().withMessage("password is required")
            .isLength({ min: 4 }).withMessage("password should be at least 4 charactors")
            .isLength({ max: 8 }).withMessage("password cannot exceed 8 charactores"),

    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("password")
            .trim()
            .notEmpty().withMessage("password is required")
            .isLength({ min: 4 }).withMessage("password should be at least 4 charactors")
            .isLength({ max: 8 }).withMessage("password cannot exceed 8 charactores"),
    ]
}

export { userRegistrationValidator, userLoginValidator }