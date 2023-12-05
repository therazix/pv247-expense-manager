const Spinner = () => (
	<div className="absolute left-0 top-[85px] h-full w-full backdrop-blur-sm lg:left-[260px] lg:top-0 lg:w-[calc(100%-260px)]">
		<div className="border-gray-200 relative left-[50%] top-[50%] h-20 w-20 animate-spin rounded-full border-8 border-t-majorelle-blue" />
	</div>
);

export default Spinner;
