import { Button } from "@mui/material";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className='px-2 bg-red-50 text-red-800 border border-red-200 rounded-lg flex gap-5 items-center '>
      <h2 className='text-xl font-semibold mb-2'>Something went wrong.</h2>
      <p className='text-sm'>Error: {error.message}</p>
      {resetErrorBoundary && (
        <Button
          color='error'
          variant='contained'
          onClick={resetErrorBoundary}
          className='bg-red-600 text-white px-4 rounded hover:bg-red-700 transition'
        >
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorFallback;
