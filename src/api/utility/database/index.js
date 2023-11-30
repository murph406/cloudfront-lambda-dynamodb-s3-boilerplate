const {
    DynamoDBClient,
} = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient, UpdateCommand, PutCommand, QueryCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb")

function database() {
    const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION })
    const documentClient = DynamoDBDocumentClient.from(client)
    const baseParams = {
        TableName: process.env.DynamoApplicationTable
    }
    let handler = null

    const returnMethods = {
        async promise() {
            return handler
        }
    }

    const methods = {
        write(primaryKeyValue, secondaryKeyValue, itemAttributes) {
            const params = {
                ...baseParams,
                Item: {
                    PK: primaryKeyValue,
                    SK: secondaryKeyValue,
                    updatedAt: new Date().toISOString(),
                    ...itemAttributes
                }
            }

            handler = async function () {
                const command = new PutCommand(params)
                const response = await documentClient.send(command)

                return response
            }()

            return returnMethods
        },
        update(primaryKeyValue, secondaryKeyValue, updateExpressions, expressionAttributeNames, expressionAttributesValues) {
            const params = {
                ...baseParams,
                Key: {
                    PK: primaryKeyValue,
                    SK: secondaryKeyValue,
                },
                UpdateExpression: `SET ${updateExpressions} #updatedAt = :updatedAt`,
                ExpressionAttributeNames: {
                    ...expressionAttributeNames,
                    '#updatedAt': 'updatedAt'
                },
                ExpressionAttributeValues: {
                    ...expressionAttributesValues,
                    ':updatedAt': new Date().toISOString()
                },
                ReturnValues: "NONE"
            }

            handler = async function () {
                const command = new UpdateCommand(params)
                const response = await documentClient.send(command)

                return response
            }()

            return returnMethods
        },
        read(pkValue, skValue) {
            const params = {
                ...baseParams,
                KeyConditionExpression: '#pk = :pkValue and #sk = :skValue',
                ExpressionAttributeNames: {
                    '#pk': 'PK',
                    '#sk': 'SK'
                },
                ExpressionAttributeValues: {
                    ':pkValue': pkValue,
                    ':skValue': skValue
                }
            }

            handler = async function () {
                const command = new QueryCommand(params)
                const response = await documentClient.send(command)

                return response
            }()

            return returnMethods
        },
        delete(primaryKeyValue, secondaryKeyValue) {
            const params = {
                ...baseParams,
                Key: {
                    PK: primaryKeyValue,
                    SK: secondaryKeyValue,
                },
            }

            handler = async function () {
                const command = new DeleteCommand(params)
                const response = await documentClient.send(command)

                return response
            }()

            return returnMethods
        }
    }


    return methods
}


module.exports = database
