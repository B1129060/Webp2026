import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

function CGUDataGrid() {
  const openUrl =
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  const columns = [
    {
      field: 'title',
      headerName: '名稱',
      width: 300,
    },
    {
      field: 'location',
      headerName: '地點',
      width: 360,
    },
    {
      field: 'price',
      headerName: '票價',
      width: 260,
    },
  ];

  useEffect(() => {
    fetch(openUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('資料載入失敗');
        }
        return response.json();
      })
      .then((data) => {
        const newRows = data.map((item, index) => {
          const showInfo =
            item.showInfo && item.showInfo.length > 0
              ? item.showInfo[0]
              : {};

          return {
            id: index + 1,
            title: item.title || '',
            location: showInfo.location || '',
            price: showInfo.price || '',
          };
        });

        setAllRows(newRows);
        setRows(newRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorText('資料載入失敗');
        setLoading(false);
      });
  }, []);

  function handleSearch(event) {
    const value = event.target.value;
    setKeyword(value);

    const filteredRows = allRows.filter((row) => {
      return row.title.includes(value);
    });

    setRows(filteredRows);
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 980,
        margin: '0 auto',
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          景點觀光展覽資訊
        </Typography>

        <TextField
          label="輸入名稱關鍵字"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleSearch}
        />
      </Box>

      {errorText !== '' && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorText}
        </Alert>
      )}

      <Box sx={{ height: 560, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default CGUDataGrid;