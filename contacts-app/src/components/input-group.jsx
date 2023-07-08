import React from "react";

function InputGroupInner(
  { label, error, className, leftContent, inputClassName, ...rest }, ref
) {
  const leftInputContent = leftContent ? (
    leftContent.type === "text" ? (
      <span className="mr-3 text-gray-500">{leftContent.text}</span>
    ) : (
      <span className="mr-3 text-gray-500">
        {React.createElement(leftContent.icon, { className: "h-6 w-6" })}
      </span>
    )
  ) : null;

  return (
    <label className={`block mb-2 ${className}`}>
      <div className="my-1 text-sm font-medium text-gray-500">{label}</div>
      <div
        className={`
        ${
          error
            ? "ring-1 ring-red-800"
            : "focus-within:outline-none focus-within:ring-1 focus-within:ring-slate-500 focus-within:ring-opacity-50 focus-within:border-slate-900"
        }
        px-3 font-medium flex items-center rounded-lg bg-gray-500/10`}
      >
        {leftInputContent}
        <input
          ref={ref}
          autoComplete="off"
          className={`font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full ${inputClassName}`}
          {...rest}
        />
      </div>
      {error && (
        <div className="px-2 text-xs text-right text-red-800">
          {error?.message}
        </div>
      )}
    </label>
  );
}

const InputGroup = React.forwardRef(InputGroupInner);

export default InputGroup;