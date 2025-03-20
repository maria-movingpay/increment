import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient({
    region: 'sa-east-1',
});

const incrementTableName = 'increment'; // Substitua pelo nome real da tabela de incrementos
const companyTableName = 'companies'; // Substitua pelo nome real da tabela de empresas

export const handler = async (event: any) => {
    console.log('Evento recebido:', JSON.stringify(event, null, 2));
    console.log('conexao: ',dynamodb)
    for (const record of event.Records) {
        if (record.eventName === 'INSERT') {
            console.log('record.dynamodb:',record.dynamodb)
            // const newItem = record.dynamodb.NewImage as DynamoDB.DocumentClient.AttributeMap;
            // const companyId = newItem?.companyId ? parseInt(newItem.companyId.N, 10) : null; // Ajuste para tratar como número
            // const itemUuid = newItem.uuid.S;

            // if (companyId) {
            //     // Verificar se já existe um item com o mesmo companyId
            //     const params: DynamoDB.DocumentClient.QueryInput = {
            //         TableName: companyTableName,
            //         IndexName: 'companyId-index', // Substitua pelo nome do índice global secundário
            //         KeyConditionExpression: 'companyId = :companyId',
            //         ExpressionAttributeValues: {
            //             ':companyId': companyId
            //         }
            //     };

            //     try {
            //         const data = await dynamodb.query(params).promise();

            //         if (data.Items && data.Items.length > 0) {
            //             // Encontrou um item com o mesmo companyId, remover o item atual
            //             const deleteParams: DynamoDB.DocumentClient.DeleteItemInput = {
            //                 TableName: companyTableName,
            //                 Key: {
            //                     uuid: itemUuid
            //                 }
            //             };
            //             await dynamodb.delete(deleteParams).promise();
            //             console.log(`Item com companyId ${companyId} removido devido à duplicação.`);
            //         } else {
            //             console.log(`Nenhuma duplicação encontrada para companyId ${companyId}.`);
            //         }
            //     } catch (err) {
            //         console.error('Erro ao verificar duplicação:', err);
            //         throw err;
            //     }
            // } else {
            //     // companyId não fornecido, obter o próximo valor do contador
            //     const params: DynamoDB.DocumentClient.GetItemInput = {
            //         TableName: incrementTableName,
            //         Key: {
            //             id: { S: 'companyId' }
            //         }
            //     };

            //     try {
            //         const data = await dynamodb.get(params).promise();
            //         const currentValue = data.Item ? parseInt(data.Item.value.N, 10) : 0; // Corrigido para valor numérico
            //         const newValue = currentValue + 1;
            //         const newCompanyId = newValue; // Não precisa de prefixo, pois é um número

            //         // Atualizar a tabela de empresas com o novo companyId
            //         const putParams: DynamoDB.DocumentClient.PutItemInput = {
            //             TableName: companyTableName,
            //             Item: {
            //                 uuid: itemUuid,
            //                 companyId: newCompanyId.toString(), // Aqui o companyId é numérico, mas convertido para string
            //                 data: newItem
            //             }
            //         };
            //         await dynamodb.put(putParams).promise();
            //         console.log(`Novo item inserido com companyId ${newCompanyId}.`);

            //         // Atualizar o contador na tabela de incrementos
            //         const updateParams: DynamoDB.DocumentClient.UpdateItemInput = {
            //             TableName: incrementTableName,
            //             Key: {
            //                 id: { S: 'companyId' }
            //             },
            //             UpdateExpression: 'SET #value = :value',
            //             ExpressionAttributeNames: {
            //                 '#value': 'value'
            //             },
            //             ExpressionAttributeValues: {
            //                 ':value': newValue.toString() // Atualizando o contador com o novo valor
            //             }
            //         };
            //         await dynamodb.update(updateParams).promise();
            //         console.log(`Contador atualizado para ${newValue}.`);
            //     } catch (err) {
            //         console.error('Erro ao processar item sem companyId:', err);
            //         throw err;
            //     }
            // }
           
        }
    }

    return 'Processamento concluído.';
};
