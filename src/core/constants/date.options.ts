/*
 * As you see there is two kids of format one for server and
 * the other for client side.
 * these two date format has equivalent output and this conflict caused
 * by the difference between .Net Date lib format (server side) and
 * moment/momentJalali format lib (client side).
 * Also you can prevent using the serverDateFormat in queryStrings you
 * are sending to the server because the queryDateServerFormat is set
 * as default format.
 */
export const queryDateClientFormat = 'YYYY/MM/DDTHH:mm:ss'
export const queryDateServerFormat = 'yyyy/MM/ddTHH:mm:ss'
