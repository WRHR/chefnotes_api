"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const BaseRecipe_1 = require("./entities/BaseRecipe");
const ModifiedRecipe_1 = require("./entities/ModifiedRecipe");
const Ingredient_1 = require("./entities/Ingredient");
const Instruction_1 = require("./entities/Instruction");
const baseRecipe_1 = require("./resolvers/baseRecipe");
const ingredient_1 = require("./resolvers/ingredient");
const instruction_1 = require("./resolvers/instruction");
const NoteRecipe_1 = __importDefault(require("./entities/NoteRecipe"));
const modifiedRecipe_1 = require("./resolvers/modifiedRecipe");
const recipeNote_1 = require("./resolvers/recipeNote");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    yield typeorm_1.createConnection({
        type: "postgres",
        database: process.env.DB,
        logging: true,
        synchronize: true,
        entities: [
            User_1.User,
            BaseRecipe_1.BaseRecipe,
            ModifiedRecipe_1.ModifiedRecipe,
            Ingredient_1.Ingredient,
            Instruction_1.Instruction,
            NoteRecipe_1.default,
        ],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: `supersecretsecret`,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                user_1.UserResolver,
                baseRecipe_1.BaseRecipeResolver,
                ingredient_1.IngredientResolver,
                instruction_1.InstructionResolver,
                modifiedRecipe_1.ModifiedRecipeResolver,
                recipeNote_1.NoteRecipeResolver
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map