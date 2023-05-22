
/**
 * @api {get} /pets List all pets
 * @apiVersion 1.0.0
 * @apiName GetPets
 * @apiGroup Pet
 * @apiDescription Get a paginated list of all pets. Sample request on example.com here.
 * @apiSampleRequest http://www.example.com
 * @apiQuery {Number{max 100}} [limit=10] Results per page.
 * @apiQuery {Number} [page=1] Number of page.
 *
 *
 * @apiSuccess (Success 200) {Number} code Status code.
 * @apiSuccess (Success 200) {Array} pets List of pets.
 * @apiSuccess (Header Response) {String} x-next Link to the next page (The same page if the answer is from the last one)
 * @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    x-next: www.example.com/pets?limit={current-limit}&page={next-page}

        {
        "code": 200,
        "pets": [
            {
            "id": 1,
            "name": "Kylie",
            "tag": "bear"
            },
            {
            "id": 2,
            "name": "Marta",
            "tag": "cetacean"
            }]
        }
 *
 * @apiError (Error 4xx) 404 Pets not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "code": 404
 *      "message": "Pets not found"
 *     }
 *
 * @apiError (500 Internal Server Error) 500 The server encountered an internal error
 *
 */

/**
 * @api {get} /pets/:petId Get a pet
 * @apiVersion 1.0.0
 * @apiName GetPetById
 * @apiGroup Pet
 * @apiParam {Number} petId <code>id</code> of the pet.
 * @apiDescription Get a pet. Sample request on example.com here.
 * @apiSampleRequest http://www.example.com
 *
 *
 *
 * @apiSuccess (Success 200) {Number} code Status code.
 * @apiSuccess (Success 200) {Object} pet  Pet information.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *      "code": 200,
 *      "pet": {
 *          "id": 5,
 *          "name": "Gina",
 *          "tag": "insect"
 *      }
 *      }
 *
 * @apiError (Error 4xx) 404 Pet not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404
 *       "message": "Pet not found"
 *     }
 *
 * @apiError (500 Internal Server Error) 500 The server encountered an internal error
 *
 */

/**
 * @api {post} /pets Create a new pet
 * @apiVersion 1.0.0
 * @apiName CreatePet
 * @apiGroup Pet
 * @apiDescription Create a new pet. Sample request on example.com here.
 * @apiSampleRequest http://www.example.com
 *
 *
 * @apiBody {String} name Name of the pet
 * @apiBody {String} [tag=null] Tag of the pet. Example: dog, cat, etc.
 *
 *
 * @apiSuccess (Success 201) {Number} code Status code.
 * @apiSuccess (Success 201) {String} message  Pet created.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *      {
 *      "code": 200,
 *      "message": "Pet created"
 *      }
 *
 * @apiError (Error 4xx) 400 "name" field cannot be null.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400
 *       "message": "\"name\" field cannot be null"
 *     }
 *
 * @apiError (500 Internal Server Error) 500 The server encountered an internal error
 *
 */