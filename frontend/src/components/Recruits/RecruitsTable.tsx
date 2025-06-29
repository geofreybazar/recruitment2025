import NoRecruitPage from "./NoRecruitPage";
import { NavLink } from "react-router";
import variables from "../../utilities/variables";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const RecruitsTable = () => {
  return (
    <div className='flex flex-col gap-2'>
      {/* {products.products.length === 0 ? (
        <NoRecruitPage />
      ) : (
        <> */}
      <div className='w-full flex flex-row-reverse items-center gap-2 '>
        <NavLink to={"/addrecruit"}>
          <Button variant='contained' size='small' color='ashblack'>
            Add Recruit
          </Button>
        </NavLink>
      </div>
      <TableContainer className='border border-gray-300 rounded-lg shadow-md'>
        <Table size='small'>
          <TableHead className='bg-turquoise'>
            <TableRow>
              <TableCell style={{ width: "5%" }}>
                <Checkbox
                // checked={
                //   selectedItems.length === products.products?.length
                // }
                // indeterminate={
                //   selectedItems.length > 0 &&
                //   selectedItems.length < products.products?.length
                // }
                // onChange={() => handleAddAllSelectedItems()}
                />
              </TableCell>
              {variables.tableHead.map((head, index) => (
                <TableCell key={index} style={variables.tableHeadStyle}>
                  {head}
                </TableCell>
              ))}

              {/* {selectedItems.length > 0 ? (
                    <>
                      <TableCell style={variables.tableHeadStyle}>
                        {selectedItems.length} Selected items
                      </TableCell>
                      <TableCell colSpan={3} style={{ width: "71.25%" }}>
                        <div className='w-full flex justify-end text-2xl cursor-pointer'>
                          <span
                            className='hover:bg-gray-300 p-2 rounded-full'
                            onClick={() => setDeleteModal(true)}
                          >
                            <MdDeleteOutline />
                          </span>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      {variables.tableHead.map((head, index) => (
                        <TableCell key={index} style={variables.tableHeadStyle}>
                          {head}
                        </TableCell>
                      ))}
                    </>
                  )} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {variables.sampleRecruitData?.map((data) => {
              // const isSelected = selectedItems.includes(data.id);
              return (
                <TableRow
                  key={data.id}
                  className='cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100'
                >
                  <TableCell>
                    <Checkbox
                    // checked={isSelected}
                    // onChange={() => handleAddSelectedItem(data.id)}
                    />
                  </TableCell>
                  <TableCell
                    style={{ width: "28.33333333333333%" }}
                    // onClick={() => handleClickProduct(data.id)}
                  >
                    {data.lastName}
                  </TableCell>
                  <TableCell
                    style={{ width: "5%" }}
                    // onClick={() => handleClickProduct(data.id)}
                  >
                    {data.age}
                  </TableCell>
                  <TableCell
                    style={{ width: "28.33333333333333%" }}
                    // onClick={() => handleClickProduct(data.id)}
                  >
                    {data.course}
                  </TableCell>
                  <TableCell
                    style={{ width: "5%" }}
                    // onClick={() => handleClickProduct(data.id)}
                  >
                    {data.gender}
                  </TableCell>
                  <TableCell
                    style={{ width: "28.33333333333333%" }}
                    // onClick={() => handleClickProduct(data.id)}
                  >
                    {data.eligibility}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={products.totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      {/* </>
      )} */}
    </div>
  );
};

export default RecruitsTable;
