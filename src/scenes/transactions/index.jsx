import React from "react";
import Header from "../../components/Header";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import FormatCurrency from "../../components/FormatCurrency";
import GridDate from "../../components/GridDate";

const Transactions = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));

  const columns = [
    {
      field: "user",
      headerName: "Transaction Name",
      flex: 1,
      cellClassName: "name-column--cell",
      // width: isExtraSmallScreen ? 50 : isSmallScreen ? 80 : 70,
      width: 50,
    },
    {
      field: "txId",
      headerName: "Transaction ID",
      width: isExtraSmallScreen ? 80 : isSmallScreen ? 100 : 150,
      // width: 80,
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      width: isExtraSmallScreen ? 50 : isSmallScreen ? 100 : 150,
      cellClassName: "date-column--cell",
      renderCell: ({ row: { date } }) => {
        return <GridDate format={date} />;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ row: { amount } }) => {
        return (
          <Typography
            color={amount > 0 ? colors.greenAccent[400] : colors.redAccent[500]}
            fontSize={
              isExtraSmallScreen
                ? "0.55rem"
                : isSmallScreen
                ? "0.75rem"
                : "0.85rem"
            }
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
            width="100%"
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
            <Typography
              color={colors.grey[100]}
              sx={{ ml: "0.25rem" }}
              fontSize={
                isExtraSmallScreen
                  ? "0.55rem"
                  : isSmallScreen
                  ? "0.75rem"
                  : "1rem"
              }
            >
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
    <Box
      m={
        isExtraSmallScreen
          ? "0.25rem"
          : isSmallScreen
          ? "0.5rem"
          : isMediumScreen
          ? "1rem"
          : "1.5rem"
      }
      p={
        isExtraSmallScreen
          ? "1rem 0 0 0"
          : isSmallScreen
          ? "1rem 0.5rem"
          : isMediumScreen
          ? "1rem"
          : "2rem"
      }
      borderRadius={isExtraSmallScreen ? "1rem" : "2rem"}
      backgroundColor={colors.primary[100]}
    >
      <Box
        marginLeft={
          isExtraSmallScreen
            ? "0.75rem"
            : isSmallScreen
            ? "1rem"
            : isMediumScreen
            ? "1rem"
            : "0"
        }
      >
        <Header
          title="Transactions"
          subtitle="Here are all your Transactions"
        />
      </Box>

      <Box
        m="1.5rem 0 0 0"
        height="75vh"
        backgroundColor={colors.primary[400]}
        borderRadius="0.5rem"
        overflow="auto"
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transactions;
