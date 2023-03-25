import React from "react";
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import FormatCurrency from "../../components/FormatCurrency";

const Transactions = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "user",
      headerName: "Transaction Name",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 150,
    },
    { field: "txId", headerName: "Transaction ID", width: 200 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      cellClassName: "date-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ row: { amount } }) => {
        return (
          <Typography
            color={amount > 0 ? colors.greenAccent[400] : colors.redAccent[500]}
          >
            {amount > 0 ? "+" : ""}
            <FormatCurrency
              amount={Number(amount).toFixed(2)}
              locale={account.locale}
              currency={account.currency}
            />
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="0.25rem"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Completed"
                ? colors.greenAccent[600]
                : colors.redAccent[400]
            }
            borderRadius="0.25rem"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "0.25rem" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows = account.transactions.map((transaction, index) => {
    return {
      id: index + 1,
      txId: transaction.txId,
      user: transaction.user,
      email: transaction.email,
      date: transaction.date,
      amount: transaction.amount,
      status: transaction.status,
    };
  });

  return (
    <Box m="1.5rem">
      <Box>
        <Header
          title="Transactions"
          subtitle="Here are all your Transactions"
        />
      </Box>

      {/* <Box */}

      {/* // display="grid"
      // gridTemplateColumns="repeat(12, 1fr)"
      // gridAutoRows="6rem"
      // gap="1rem"
      // ml="2rem"
      > */}
      {/* ROW ONE */}
      {/* <Box
          gridColumn="span 8"
          display="flex"
          backgroundColor={colors.primary[600]}
          justifyContent="space-between"
          gap="2rem"
        >
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gridRow="span 1"
          >
            <StatBox
              icon={<AccountBalanceOutlined />}
              title="5000"
              subtitle="My Balance"
              increase="+14%"
            />
          </Box>

          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              icon={<AccountBalanceOutlined />}
              title="40000"
              subtitle="My Balance"
              increase="+14%"
            />
          </Box>

          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              icon={<AccountBalanceOutlined />}
              title="4768"
              subtitle="My Balance"
              increase="+14%"
            />
          </Box>
        </Box> */}
      <Box
        m="1.5rem 0 0 0"
        height="75vh"
        backgroundColor={colors.primary[400]}
        borderRadius="0.5rem"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default Transactions;
